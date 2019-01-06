# Importations
import logging
import httplib2

from django.conf import settings

from apiclient import errors, discovery
from oauth2client.client import flow_from_clientsecrets
from oauth2client.client import FlowExchangeError

from .exceptions import *
from .models import CompteGoogle

# Classe
class OAuth:
    # Constantes
    CLIENT_SECRETS = settings.GOOGLE_API["CLIENT_SECRETS"]
    SCOPES         = ' '.join(settings.GOOGLE_API["SCOPES"])
    REDIRECT_URI   = settings.GOOGLE_API["REDIRECT_URI"]

    # Méthodes
    @staticmethod
    def get_stored_credentials(user_id):
        try:
            return CompteGoogle.objects.get(user_id=user_id).credentials

        except CompteGoogle.DoesNotExist:
            return None

    @staticmethod
    def store_credentials(email, user_id, credentials):
        CompteGoogle.objects.get_or_create(user_id = str(user_id),
            defaults = {
                "nom": email,
                "credentials": credentials
            }
        )

    @staticmethod
    def exchange_code(authorization_code):
        flow = flow_from_clientsecrets(OAuth.CLIENT_SECRETS, OAuth.SCOPES)
        flow.redirect_uri = OAuth.REDIRECT_URI

        try:
            credentials = flow.step2_exchange(authorization_code)
            return credentials
        except FlowExchangeError as error:
            logging.error('An error occurred: %s', error)
            raise CodeExchangeException(None)

    @staticmethod
    def get_user_info(credentials):
        user_info_service = discovery.build(
            serviceName='oauth2', version='v2',
            http=credentials.authorize(httplib2.Http())
        )
        user_info = None

        try:
            user_info = user_info_service.userinfo().get().execute()
        except errors.HttpError as e:
            logging.error('An error occurred: %s', e)

        if user_info and user_info.get('id'):
            return user_info
        else:
            raise NoUserIdException()

    @staticmethod
    def get_authorization_url(email_address, state):
        flow = flow_from_clientsecrets(OAuth.CLIENT_SECRETS, OAuth.SCOPES)
        flow.params['access_type'] = 'offline'
        flow.params['approval_prompt'] = 'force'
        flow.params['user_id'] = email_address
        flow.params['state'] = state

        return flow.step1_get_authorize_url(OAuth.REDIRECT_URI)

    @staticmethod
    def get_credentials(authorization_code, state):
        email_address = ''

        try:
            credentials = OAuth.exchange_code(authorization_code)
            user_info = OAuth.get_user_info(credentials)
            email_address = user_info.get('email')
            user_id = user_info.get('id')
            if credentials.refresh_token is not None:
                OAuth.store_credentials(email_address, user_id, credentials)
                return credentials
            else:
                credentials = OAuth.get_stored_credentials(user_id)
                if credentials and credentials.refresh_token is not None:
                    return credentials

        except CodeExchangeException as error:
            logging.error('An error occurred during code exchange.')
            # Drive apps should try to retrieve the user and credentials for the current
            # session.
            # If none is available, redirect the user to the authorization URL.
            error.authorization_url = OAuth.get_authorization_url(email_address, state)
            raise error

        except NoUserIdException:
            logging.error('No user ID could be retrieved.')

        # No refresh token has been retrieved.
        authorization_url = OAuth.get_authorization_url(email_address, state)
        raise NoRefreshTokenException(authorization_url)

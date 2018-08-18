# Importations
from django import template
from django.utils.html import format_html
from django.utils.safestring import mark_safe

import sqlparse

# Librairie
register = template.Library()

def html_contstruct(res, token):
    # Ajout du token
    if token.is_keyword:
        res += format_html(
            "<code class=\"keyword\">{}</code>",
            token.normalized
        )

    elif token.is_group:
        cls = ""
        if isinstance(token, sqlparse.sql.Identifier):
            cls = "identifier"
        elif isinstance(token, sqlparse.sql.Parenthesis):
            cls = "parenthesis"
        elif token[0].ttype and token[0].ttype[0] == "Keyword":
            cls = token[0].value.lower()

        res += format_html("<div class=\"{}\">", cls)

        # Récursion
        for t in token.tokens:
            res = html_contstruct(res, t)

        res += mark_safe("</div>")

    elif not token.is_whitespace:
        cls = token.ttype[0].lower()
        if token.normalized == ",":
            cls = "comma"

        res += format_html(
            "<code class=\"{}\">{}</code>",
            cls, token.normalized
        )

    return res

@register.filter
def sql2html(sql):
    # Analyse
    stmts = sqlparse.parse(sql)

    # Construction du résultat
    res = mark_safe("")

    for stmt in stmts:
        for token in stmt.tokens:
            res = html_contstruct(res, token)

    return res
# Importations
from django import template
from django.utils.html import format_html, escape
from django.utils.safestring import mark_safe

import sqlparse

# Librairie
register = template.Library()

def html_contstruct(res, token, pit): # pit = previous is token
    if pit and not token.is_keyword and not token.is_whitespace:
        res += mark_safe("</code>")

    # Ajout du token
    if token.is_keyword:
        if pit:
            res += escape(" " + token.normalized)

        else:
            res += format_html(
                "<code class=\"keyword\">{}",
                token.normalized
            )

    elif token.is_group:
        cls = ""
        if isinstance(token, sqlparse.sql.Identifier):
            cls = "identifier"
        elif isinstance(token, sqlparse.sql.IdentifierList):
            cls = "identifier-list"
        elif isinstance(token, sqlparse.sql.Function):
            cls = "function"
        elif isinstance(token, sqlparse.sql.Parenthesis):
            cls = "parenthesis"
        elif token[0].ttype and token[0].ttype[0] == "Keyword":
            cls = token[0].value.lower()

        res += format_html("<div class=\"{}\">", cls)

        # Récursion
        it = False

        for t in token.tokens:
            res, it = html_contstruct(res, t, it)

        if it:
            res += mark_safe("</code>")

        res += mark_safe("</div>")

    elif not token.is_whitespace:
        cls = ' '.join(t.lower() for t in token.ttype)
        if token.normalized == ",":
            cls = "comma"

        res += format_html(
            "<code class=\"{}\">{}</code>",
            cls, token.normalized
        )

    return res, token.is_keyword or (pit and token.is_whitespace)

@register.filter
def sql2html(sql):
    # Analyse
    stmts = sqlparse.parse(sql)

    # Construction du résultat
    res = mark_safe("")

    for stmt in stmts:
        it = False

        for token in stmt.tokens:
            res, it = html_contstruct(res, token, it)

        if it:
            res += mark_safe("</code>")


    return res
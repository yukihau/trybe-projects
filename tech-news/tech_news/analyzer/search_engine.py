from datetime import datetime
from tech_news.database import search_news


def format_news(news):
    return [
        (article["title"], article["url"]) for article in news
    ]


# Requisito 6
def search_by_title(title):
    news = search_news({"title": {"$regex": f"{title.lower()}"}})
    return format_news(news)


# Requisito 7
def search_by_date(date):
    try:
        date_obj = datetime.strptime(date, '%Y-%m-%d')
        formatted_date = datetime.strftime(date_obj, '%d/%m/%Y')
        news = search_news({"timestamp": formatted_date})
        return format_news(news)
    except ValueError:
        raise ValueError('Data inválida')


# Requisito 8
def search_by_tag(tag):
    news = search_news(
        {"tags": {"$regex": f"{tag.lower().capitalize()}"}}
    )
    return format_news(news)


# Requisito 9
def search_by_category(category):
    news = search_news(
        {"category": {"$regex": f"{category.lower().capitalize()}"}}
    )
    return format_news(news)

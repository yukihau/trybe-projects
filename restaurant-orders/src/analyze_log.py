import os
import csv


def validate_file(path_to_file):
    if not path_to_file.endswith(".csv"):
        raise FileNotFoundError(f"Extensão inválida '{path_to_file}'")
    elif not os.path.exists(path_to_file):
        raise FileNotFoundError(f"Arquivo inexistente: '{path_to_file}'")
    return True


def get_meals_ordered_by(customer, data):
    meal_array = [line[1] for line in data if customer in line]
    meals = dict.fromkeys(meal_array, 0)

    for meal in meal_array:
        meals[meal] += 1

    return meals


def most_ordered_by(customer, data):
    meals = get_meals_ordered_by(customer, data)

    result = (None, 0)
    for meal, amount in meals.items():
        if amount > result[1]:
            result = (meal, amount)

    return result[0]


def meal_amount_ordered_by(customer, meal, data):
    meals = get_meals_ordered_by(customer, data)
    return meals[meal]


def get_all_available_meals(data):
    return list(set([line[1] for line in data]))


def meals_never_ordered_by(customer, data):
    all_meals = set(get_all_available_meals(data))
    ordered_meals = set(get_meals_ordered_by(customer, data))
    return all_meals.difference(ordered_meals)


def get_open_days(data):
    return list(set([line[2] for line in data]))


def get_days_frequented(customer, data):
    return list(set([
        line[2] for line in data
        if customer in line
    ]))


def infrequent_days_by(customer, data):
    days_open = set(get_open_days(data))
    days_frequented = set(get_days_frequented(customer, data))
    return days_open.difference(days_frequented)


def format_data(data):
    formatted = (
        f"{most_ordered_by('maria', data)}\n"
        f"{meal_amount_ordered_by('arnaldo', 'hamburguer', data)}\n"
        f"{meals_never_ordered_by('joao', data)}\n"
        f"{infrequent_days_by('joao', data)}\n"
    )
    return formatted


def analyze_log(path_to_file):
    validate_file(path_to_file)

    with open(path_to_file) as file:
        content = csv.reader(file, delimiter=",", quotechar='"')
        data = [line for line in content]

    with open("data/mkt_campaign.txt", mode="w") as file:
        to_write = format_data(data)
        file.writelines(to_write)

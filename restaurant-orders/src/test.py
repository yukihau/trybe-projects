def most_ordered_by(customer, data):
    meal_array = [line[1] for line in data if customer in line]
    meals_ordered = dict.fromkeys(meal_array, 0)

    for meal in meal_array:
        meals_ordered[meal] += 1

    result = (None, 0)
    for meal, amount in meals_ordered.items():
        if amount > result[1]:
            result = (meal, amount)

    return result[0]


gotten = most_ordered_by(
    'maria',
    [
        ['maria', 'hamburger', 'sexta-feira'],
        ['maria', 'coxinha', 'sexta-feira'],
        ['maria', 'hamburger', 'sexta-feira'],
        ['marionete', 'hamburger', 'sexta-feira']
    ]
)

print(gotten)

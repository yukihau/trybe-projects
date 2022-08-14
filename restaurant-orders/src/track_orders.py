class TrackOrders:
    def __init__(self):
        self.orders = []

    def __len__(self):
        return len(self.orders)

    def __get_dishes_ordered_by(self, customer):
        dish_array = [
            order["dish"] for order in self.orders
            if order["customer"] == customer
        ]
        dishes = dict.fromkeys(dish_array, 0)

        for dish in dish_array:
            dishes[dish] += 1

        return dishes

    def __get_all_available_meals(self):
        return list(set([order["dish"] for order in self.orders]))

    def __get_open_days(self):
        return list(set([order["day"] for order in self.orders]))

    def __get_days_frequented(self, customer):
        return list(set([
            order["day"] for order in self.orders
            if order["customer"] == customer
        ]))

    def __get_day_frequency(self):
        day_array = self.__get_open_days()
        days = dict.fromkeys(day_array, 0)

        for orders in self.orders:
            days[orders["day"]] += 1

        return days

    def add_new_order(self, customer, dish, day):
        self.orders.append({
            "customer": customer,
            "dish": dish,
            "day": day
        })

    def get_most_ordered_dish_per_customer(self, customer):
        meals = self.__get_dishes_ordered_by(customer)

        result = (None, 0)
        for meal, amount in meals.items():
            if amount > result[1]:
                result = (meal, amount)

        return result[0]

    def get_never_ordered_per_customer(self, customer):
        all_meals = set(self.__get_all_available_meals())
        ordered_meals = set(self.__get_dishes_ordered_by(customer))
        return all_meals.difference(ordered_meals)

    def get_days_never_visited_per_customer(self, customer):
        days_open = set(self.__get_open_days())
        days_frequented = set(self.__get_days_frequented(customer))
        return days_open.difference(days_frequented)

    def get_busiest_day(self):
        days = self.__get_day_frequency()

        result = (None, 0)
        for day, amount in days.items():
            if amount > result[1]:
                result = (day, amount)

        return result[0]

    def get_least_busy_day(self):
        days = self.__get_day_frequency()

        result = (max(days), days[max(days)])
        for day, amount in days.items():
            if amount < result[1]:
                result = (day, amount)

        return result[0]

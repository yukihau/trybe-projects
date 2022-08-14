from datetime import datetime


class ReportGetter:
    @staticmethod
    def get_date_list(products, datestring):
        return list(product[datestring] for product in products)

    def get_company_list(products):
        companies = []
        for product in products:
            company = product['nome_da_empresa']
            if company not in companies:
                companies.append(company)
        return companies

    def get_company_product_count(products, company):
        return len(
            list(
                product for product in products
                if product['nome_da_empresa'] == company
            )
        )

    def get_oldest_fabrication_date(products):
        my_dates = ReportGetter.get_date_list(
            products, 'data_de_fabricacao'
        )
        return min(my_dates)

    def get_newest_validation_date(products):
        my_dates = ReportGetter.get_date_list(
            products, 'data_de_validade'
        )
        curr_date = datetime.now().strftime('%Y-%m-%d')
        newest = my_dates[0]
        for date in my_dates:
            if date > curr_date and date < newest:
                newest = date
        return newest

    def get_company_with_most_products(products):
        companies = list(product['nome_da_empresa'] for product in products)
        return max(companies, key=companies.count)

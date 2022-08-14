from .report_getter import ReportGetter
from .report_formatter import ReportFormatter


class CompleteReport:
    @staticmethod
    def generate(products):
        oldest_fabrication_date = (
            ReportGetter.get_oldest_fabrication_date(products)
        )
        newest_validation_date = (
            ReportGetter.get_newest_validation_date(products)
        )
        company_with_most_products = (
            ReportGetter.get_company_with_most_products(products)
        )
        products_per_company = (
            ReportFormatter.get_company_product_amount_string_list(products)
        )
        return (
            f"Data de fabricação mais antiga: {oldest_fabrication_date}\n"
            f"Data de validade mais próxima: {newest_validation_date}\n"
            f"Empresa com mais produtos: {company_with_most_products}\n"
            f"Produtos estocados por empresa:\n"
            f"{''.join(products_per_company)}"
        )

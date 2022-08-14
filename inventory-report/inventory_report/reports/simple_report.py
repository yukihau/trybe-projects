from .report_getter import ReportGetter


class SimpleReport:
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
        return (
            f"Data de fabricação mais antiga: {oldest_fabrication_date}\n"
            f"Data de validade mais próxima: {newest_validation_date}\n"
            f"Empresa com mais produtos: {company_with_most_products}"
        )

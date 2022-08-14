from inventory_report.inventory.product import Product


test_product = {
    "id": 1,
    "nome_do_produto": 'Produto Teste',
    "nome_da_empresa": 'Empresa teste',
    "data_de_fabricacao": '7/11/2022',
    "data_de_validade": '8/11/2022',
    "numero_de_serie": '78129',
    "instrucoes_de_armazenamento": 'na caixa',
}


def test_relatorio_produto():
    product = Product(
        test_product['id'],
        test_product['nome_do_produto'],
        test_product['nome_da_empresa'],
        test_product['data_de_fabricacao'],
        test_product['data_de_validade'],
        test_product['numero_de_serie'],
        test_product['instrucoes_de_armazenamento']
    )
    assert str(product) == (
        f"O produto {test_product['nome_do_produto']}"
        f" fabricado em {test_product['data_de_fabricacao']}"
        f" por {test_product['nome_da_empresa']} com validade"
        f" até {test_product['data_de_validade']}"
        f" precisa ser armazenado"
        f" {test_product['instrucoes_de_armazenamento']}."
    )

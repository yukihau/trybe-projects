def verify_line(word, text_file):
    result = {
        "palavra": word,
        "arquivo": text_file["nome_do_arquivo"],
        "ocorrencias": list(
            {"linha": index+1}
            for index, line in enumerate(text_file["linhas_do_arquivo"])
            if word in line.lower()
        ),
    }
    if len(result["ocorrencias"]) == 0:
        return None
    return result


def exists_word(word, instance):
    result = list()
    for index in range(len(instance)):
        data = instance.search(index)
        verified = verify_line(word, data)
        if verified:
            result.append(verified)
    return result


def search_by_word(word, instance):
    """Aqui irá sua implementação"""

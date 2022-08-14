def is_anagram(first_string, second_string):
    if (
        first_string == ""
        or second_string == ""
        or len(first_string) != len(second_string)
    ):
        return False

    first_string_arr = list(first_string.lower())
    second_string_arr = list(second_string.lower())

    for char in first_string_arr:
        if char not in second_string_arr:
            return False
        second_string_arr.remove(char)

    return True

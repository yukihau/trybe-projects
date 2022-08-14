def is_palindrome_recursive(word, low_index, high_index):
    if word == "":
        return False

    if low_index > high_index:
        return True

    if word[low_index] != word[high_index]:
        return False

    new_low = low_index + 1
    new_high = high_index - 1

    return is_palindrome_recursive(word, new_low, new_high)

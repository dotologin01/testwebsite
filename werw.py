def lcg(a, c, m, seed, length):
    X = seed
    random_numbers = []
    for _ in range(length):
        X = (a * X + c) % m
        random_numbers.append(X)
    return random_numbers

def encrypt(text, gammas):
    # Преобразование текста в числовой формат
    alphabet = {chr(i + 1040): i + 1 for i in range(32)}  # Русский алфавит (А-Я)
    encrypted_numbers = []
    
    for i, char in enumerate(text):
        if char in alphabet:
            num = alphabet[char]
        else:
            num = 0  # Для пробелов и знаков препинания, если нужны особые обработки, можно изменить

        # Шифрование
        encrypted_num = (num + gammas[i]) % 32
        encrypted_numbers.append(encrypted_num)

    return encrypted_numbers

def main():
    # Параметры генератора
    a = 5
    c = 3
    m = 32
    seed = 1
    text = "не все те повара зпт что с длинными ножами ходят тчк"
    
    # Генерация гаммы
    length = len(text)  # Длина гаммы соответствует длине текста
    gammas = lcg(a, c, m, seed, length)
    
    # Шифрование
    encrypted_text = encrypt(text, gammas)
    
    # Вывод зашифрованного текста
    print("Зашифрованный текст:", encrypted_text)

if __name__ == "__main__":
    main()

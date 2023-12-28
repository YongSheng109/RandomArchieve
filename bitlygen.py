import requests

def get_random_words(words=10, length=5):
    url = f"https://random-word-api.vercel.app/api?words={words}&length={length}"
    
    try:
        response = requests.get(url)
        response.raise_for_status() 

        data = response.json()

        return data
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

def generate_urls(random_words):
    base_url = "https://bit.ly/"
    return [base_url + word for word in random_words]

try:
    num_words = int(input("Enter the number of words: "))
    word_length = int(input("Enter the length of each word: "))
except ValueError:
    print("Please enter valid numbers.")
    exit()
    
random_words = get_random_words(words=num_words, length=word_length)

if random_words:
    urls = generate_urls(random_words)
    print("Generated URLs:")
    for url in urls:
        print(url)

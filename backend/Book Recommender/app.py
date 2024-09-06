from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load models and data
model = pickle.load(open('artifacts/model.pkl', 'rb'))
books_name = pickle.load(open('artifacts/books_name.pkl', 'rb'))
final_rating = pickle.load(open('artifacts/final_rating.pkl', 'rb'))
book_pivot = pickle.load(open('artifacts/book_pivot.pkl', 'rb'))

def fetch_poster(suggestion):
    book_name = []
    ids_index = []
    poster_url = []

    for book_id in suggestion:
        book_name.append(book_pivot.index[book_id])

    for name in book_name:
        ids = np.where(final_rating['title'] == name)[0]
        if ids.size == 0:
            continue
        ids_index.append(ids[0])
    
    for idx in ids_index:
        if idx < len(final_rating):
            url = final_rating.iloc[idx]['img_url']
            poster_url.append(url)
        else:
            poster_url.append('')

    return poster_url

@app.route('/recommend', methods=['GET'])
def recommend():
    book_name = request.args.get('book_name')
    
    if not book_name or book_name not in book_pivot.index:
        return jsonify({"error": "Book not found"}), 400

    book_id = np.where(book_pivot.index == book_name)[0][0]
    distance, suggestion = model.kneighbors(book_pivot.iloc[book_id, :].values.reshape(1, -1), n_neighbors=6)
    
    suggestion = suggestion.flatten()
    
    recommendation_books = [book_pivot.index[i] for i in suggestion]
    poster_url = fetch_poster(suggestion)
    
    return jsonify({
        "books": recommendation_books,
        "posters": poster_url
    })

@app.route('/suggestions', methods=['GET'])
def suggestions():
    query = request.args.get('query', '')
    suggestions_list = [book for book in books_name if query.lower() in book.lower()]
    
    return jsonify(suggestions_list)

if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0")

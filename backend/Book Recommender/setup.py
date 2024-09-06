from setuptools import setup

with open("README.md", "r", encoding="utf-8") as f:
  long_description = f.read()
  
REPO_NAME = "Book-Recommender"
AUTHOR_NAME = "NamanSoni18"
SRC_REPO = "src"
LIST_OF_REQUIREMENTS = ['streamlit', 'numpy']

setup(
  name = SRC_REPO,
  version = "0.0.1",
  author = AUTHOR_NAME,
  description = "Book Recommender System",
  long_description = "Book recommender is an ML application which uses complex Algoritm (K- Nearest Neighbors) to extract the data",
  long_description_content_type = "text/markdown",
  url = f"https://github.com/{AUTHOR_NAME}/{REPO_NAME}",
  author_email = "sknaman763@gmail.com",
  packages = [SRC_REPO],
  python_requires = ">=3.12.4",
  install_requires = LIST_OF_REQUIREMENTS
)
mkdir ~p ~/.streamlit/

echo "\
[server]\n\
port = $PORT\n\
enableCORS = false
headless = true\n\
\n\
" > ~/.streamlit/config.toml
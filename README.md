# flower-frontend

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 追記
axiosインストール(参考https://qiita.com/right1121/items/092ac7ff747e1c47b2b1)
```
npm install --save axios vue-axios
```

vue-routerインストール（参考https://qiita.com/camomile_cafe/items/12de555b87c4654cc49a）
```
npm install --save-dev vue-router
```

```
npm install --save vuex
```

Element UIインストール

```
vue add element
? How do you want to import Element? Fully import
? Do you wish to overwrite Element's SCSS variables? No
? Choose the locale you want to load ja
```


## 動作確認
```
$ cd test_backend
$ pipenv install
$ pipenv shell
(test_flower-backend) bash-3.2$ python main.py
 * Serving Flask app "main" (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

```
$ cd flower-frontend
$ npm run serve
```

下記にアクセス
- http://localhost:8080/
- http://localhost:8080/followings
- http://localhost:8080/followers

// Update with your config settings.

module.exports = {
  // 開発環境の設定(デフォルトで参照される設定)
  development: {
    // データベースの種類
    client: 'mysql', 

    // DB接続設定
    connection: {
      host     : '127.0.0.1',
      user     : 'root',
      password : 'root',
      database : 'todoapp'
    },
    // コネクションプールの設定
    pool: {
      min: 2,
      max: 10
    },
    // マイグレーション設定
    migrations: {
      // マイグレーションファイルの配置先(knexfile.jsからの相対)
      directory:'./db/migrations',
      // マイグレーションを管理するテーブル名
      tableName: 'task'
    }
  },
  // 開発環境とは異なる環境のマイグレーション実行設定定義 (本番環境,検証環境の差別化等)
  staging: {
    client: 'mysql',
    connection: {
      database: 'todoapp',
      user:     'root',
      password: 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'task'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'todoapp',
      user:     'root',
      password: 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'task'
    }
  }

};

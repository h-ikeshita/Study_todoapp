
exports.up = function(knex, Promise) {
  // テーブルが存在するかどうか確認
  return knex.schema.hasTable('task')
    //判定結果を引数existsに渡して無名関数をコールバック
    .then(function(exists) {
      //テーブルがなかった場合(正規処理
      if (!exists) {
           // 接続先のスキーマに指定した名前でテーブルを作成する
          return knex.schema.createTable('task', 
            // 作成したテーブルにカラムを作成する
            function(table) {
               // テーブルの要素設定 ←TODOこの通りのテーブルが作成されない(10/13
              table.increments('id').primary();
              table.varchar('title').notNullable();
              table.varchar('content').notNullable();
          });
       //既にテーブルある場合
      }else{
          return new Error("The table already exists. ");
      }
  });
};

// テーブルを削除(drop)する。レコードの削除ではない
exports.down = function(knex, Promise) {
  return knex.schema.hasTable('task').then(function(exists) {
      if (exists) {
          // 指定したテーブルを削除する
          return knex.schema.dropTable('task');
      }
  });
};
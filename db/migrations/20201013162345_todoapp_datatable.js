
exports.up = function(knex, Promise) {
  // �e�[�u�������݂��邩�ǂ����m�F
  return knex.schema.hasTable('task')
    //���茋�ʂ�����exists�ɓn���Ė����֐����R�[���o�b�N
    .then(function(exists) {
      //�e�[�u�����Ȃ������ꍇ(���K����
      if (!exists) {
           // �ڑ���̃X�L�[�}�Ɏw�肵�����O�Ńe�[�u�����쐬����
          return knex.schema.createTable('task', 
            // �쐬�����e�[�u���ɃJ�������쐬����
            function(table) {
               // �e�[�u���̗v�f�ݒ� ��TODO���̒ʂ�̃e�[�u�����쐬����Ȃ�(10/13
              table.increments('id').primary();
              table.varchar('title').notNullable();
              table.varchar('content').notNullable();
          });
       //���Ƀe�[�u������ꍇ
      }else{
          return new Error("The table already exists. ");
      }
  });
};

// �e�[�u�����폜(drop)����B���R�[�h�̍폜�ł͂Ȃ�
exports.down = function(knex, Promise) {
  return knex.schema.hasTable('task').then(function(exists) {
      if (exists) {
          // �w�肵���e�[�u�����폜����
          return knex.schema.dropTable('task');
      }
  });
};
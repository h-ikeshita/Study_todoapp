// Update with your config settings.

module.exports = {
  // �J�����̐ݒ�(�f�t�H���g�ŎQ�Ƃ����ݒ�)
  development: {
    // �f�[�^�x�[�X�̎��
    client: 'mysql', 

    // DB�ڑ��ݒ�
    connection: {
      user     : 'root',
      password : 'root',
      database : 'todoapp'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    // �R�l�N�V�����v�[���̐ݒ�
    pool: {
      min: 2,
      max: 10
    },
    // �}�C�O���[�V�����ݒ�
    migrations: {
      // �}�C�O���[�V�����t�@�C���̔z�u��(knexfile.js����̑���)
      directory:'./db/migrations',
      // �}�C�O���[�V�������Ǘ�����e�[�u����
      tableName: 'migration'
    }
  },
  // �J�����Ƃ͈قȂ���̃}�C�O���[�V�������s�ݒ��` (�{�Ԋ�,���؊��̍��ʉ���)
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

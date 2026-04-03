
import {Sequelize} from 'sequelize';

const sequelize = new Sequelize( {
    dialect: 'sqlite',
    storage: '../../db/TimeSheet.db',
    logging: true, 
}
);

export default sequelize;
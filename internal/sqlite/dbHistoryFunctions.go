package sqlite

import (
	"log"
)

const saveChangeHistoryExec = `insert into change_history (id_user, id_field) values (?,?)`

func (p postgresSQL) SaveChangeHistory(idUser, idProduct string) error {
	_, err := p.dbConnection.Exec(saveChangeHistoryExec, idUser, idProduct)
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

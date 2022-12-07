package mariadb

import (
	db "dating-app/internal/database/mariadb"
	"dating-app/pkg/models"
)

type User models.User
type UserRepository models.UserRepository

func (u *User) CreateUser() (int64, error) {
	res, err := db.Client.Exec(
		"INSERT INTO user (email, password, name, gender, age) VALUES (?,?,?,?,?)",
		u.Email, u.Password, u.Name, u.Gender, u.Age)
	if err != nil {
		return 0, err
	}
	id, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}
	return id, nil
}

func (u *User) GetAllUser() ([]*User, error) {
	var users []*User
	rows, err := db.Client.Query("SELECT * FROM user")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var u *User
		err = rows.Scan(&u.ID, &u.Email, &u.Password, &u.Name, &u.Gender, &u.Age)
		if err != nil {
			return users, err
		}
		users = append(users, u)
	}
	err = rows.Err()
	if err != nil {
		return users, err
	}
	return users, nil
}
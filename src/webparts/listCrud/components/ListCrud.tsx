/* eslint-disable no-useless-concat */
/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-var */
/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import styles from './ListCrud.module.scss';
import { IListCrudProps } from './IListCrudProps';
import { Modal } from '@fluentui/react';
import { getSP } from '../../../pnpjsconfig';
import { SPFI } from '@pnp/sp';
import * as React from 'react';
import { IListCrud } from './interface';
import * as dayjs from 'dayjs';

var myArray = [
  "Gryffindor",
  "Slytherin",
  "Ravenclaw",
  "Hufflepuff"
]

const ListCrud = (props: IListCrudProps) => {
  const LIST_NAME = 'Hogwart hat'
  let _sp: SPFI = getSP(props.context);

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [house, setHouse] = useState('')
  const [date, setDate] = useState(Date)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)
  const [isOpen3, setIsOpen3] = useState(false)
  const [hatList, setHatList] = useState<IListCrud[]>([])


  const getCurrentUser = async () => {
    const user = await _sp.web.currentUser()
    setEmail(user.Email)
    setName(user.Title)

  }

  const getListItem = async () => {
    const items = _sp.web.lists.getByTitle(LIST_NAME).items.select().orderBy('field_0', true).orderBy('Title', true)();
    setHatList((await items).map((item: any) => {
      return {
        Title: item.Title,
        House: item.field_0,
        Email: item.field_3,
        DOB: item.field_2
      }
    }))
  }

  // const getLastestHouse = async () => {
  //   const lastestItem = _sp.web.lists.getByTitle(LIST_NAME).items.select().top(1).orderBy('ID', false)();
  //   var output: string[] = [];
  //   for (var i = 0; i < (await lastestItem).length; ++i)
  //     output = (await lastestItem)[i]['field_0']
  //   var house1 = output.toString()
  //   setHouse(house1)
  // }

  const checkUserHouse = async () => {
    const items = _sp.web.lists.getByTitle(LIST_NAME).items.select().filter(`field_3 eq '${email}'`).getAll();
    console.log("userlists", items)
    var output: string[] = [];
    for (var i = 0; i < (await items).length; ++i)
      output = (await items)[i]['field_0']
    var house1 = output.toString()
    setHouse(house1)
  }

  const toggleModal = () => {
    if (isOpen === true) {
      setIsOpen(false)
    } else setIsOpen(true)
  }

  const toggleModal2 = () => {
    if (isOpen2 === true) {
      setIsOpen2(false)
    } else setIsOpen2(true)
  }

  const toggleModal3 = () => {
    if (isOpen3 === true) {
      setIsOpen3(false)
    } else setIsOpen3(true)
  }

  const createHouse = async () => {
    var randomItem = myArray[Math.floor(Math.random() * myArray.length)];
    setDate(Date().toLocaleString())
    if (house !== '') {
      toggleModal2()
    }
    else {
      await _sp.web.lists.getByTitle(LIST_NAME).items.add({
        Title: name,
        field_0: randomItem,
        field_2: dayjs(date).format('DD-MM-YYYYTHH:mm:ss'),
        field_3: email
      })
      reRender()
      setHouse(randomItem)
    }
  }

  const randomHouse = async () => {
    myArray = myArray.filter(item => {
      return item !== house
    })
    console.log(myArray)

    if (myArray.length > 0 && house !== '') {
      var randomItem = myArray[Math.floor(Math.random() * myArray.length)];
      setHouse(randomItem)
      await _sp.web.lists.getByTitle(LIST_NAME).items.add({
        Title: name,
        field_0: randomItem,
        field_2: dayjs(date).format('DD-MM-YYYYTHH:mm:ss'),
        field_3: email
      })
      reRender()
    } else if (house === '') {
      toggleModal()
    }
    else toggleModal3()
  }

  const reRender = () => {
    getListItem()
  }

  useEffect(() => {
    getCurrentUser()
    checkUserHouse()
    getListItem()
    // getLastestHouse()

  }, [email])

  // useEffect(() => {



  // }, [email])


  return (
    <div className={styles.root}>
      <h2>Current User Profile</h2>
      <div className={styles.containerHeader}>
        <div className={styles.header}>
          <label>Email: </label>
          <input type="text" disabled value={email} />
        </div>
        <div className={styles.header}>
          <label>Full Name: </label>
          <input type="text" disabled value={name} />
        </div>
        <div className={styles.header}>
          <label>House: </label>
          <input id='house' type="text" disabled value={house} />
        </div>
        <div className={styles.header}>
          <label>Date/Time: </label>
          <input type="text" disabled value={date} />
        </div>
        <div>
          <button type='submit' onClick={() => createHouse()}>Sort</button>
          <button type='submit' onClick={() => randomHouse()}>Sort Again</button>
        </div>
        <Modal
          isOpen={isOpen}
          onDismiss={() => toggleModal()}
        ><h2>Must click "Sort" button first</h2></Modal>
        <Modal
          isOpen={isOpen2}
          onDismiss={() => toggleModal2()}
        ><h2>Already have "House"</h2></Modal>
        <Modal
          isOpen={isOpen3}
          onDismiss={() => toggleModal3()}
        ><h2>Reload page to sort again</h2></Modal>

      </div>
      <h2>Tubular format</h2>
      <div className={styles.container}>
        <table>
          <tr>
            <th>House</th>
            <th>Email</th>
            <th>Full Name</th>
            <th>Date</th>
          </tr>
          {/* {hatList.map((o: IListCrud, index: number) => (
            <tr key={index}>
              <td>{o.House}</td>
              <td>{o.Email}</td>
              <td>{o.Title}</td>
              <td>{o.DOB}</td>
            </tr>
          ))} */}
          {hatList.map((o: IListCrud, index: number) => {
            if (o.House === 'Gryffindor') {
              return (
                <tr className={styles.Gryffindor} key={index} >
                  <td>{o.House}</td>
                  <td>{o.Email}</td>
                  <td>{o.Title}</td>
                  <td>{o.DOB}</td>
                </tr>
              )
            }
            if (o.House === 'Slytherin') {
              return (
                <tr className={styles.Slytherin} key={index} >
                  <td>{o.House}</td>
                  <td>{o.Email}</td>
                  <td>{o.Title}</td>
                  <td>{o.DOB}</td>
                </tr>
              )
            }
            if (o.House === 'Ravenclaw') {
              return (
                <tr className={styles.Ravenclaw} key={index} >
                  <td>{o.House}</td>
                  <td>{o.Email}</td>
                  <td>{o.Title}</td>
                  <td>{o.DOB}</td>
                </tr>
              )
            }
            if (o.House === 'Hufflepuff') {
              return (
                <tr className={styles.Hufflepuff} key={index} >
                  <td>{o.House}</td>
                  <td>{o.Email}</td>
                  <td>{o.Title}</td>
                  <td>{o.DOB}</td>
                </tr>
              )
            }
          })}
        </table>
      </div>
    </div>
  );
}

export default ListCrud
/* eslint-disable no-console */
import firebase from 'react-native-firebase'
import Config from 'react-native-config'

class Firestore {
  constructor() {
    this.collection = firebase.firestore().collection(Config.ENV)
  }

  onSnapshot(id, callback) {
    this.collection.doc(id).onSnapshot((doc) => {
      callback(doc.data() || null)
    })
  }

  onSnapshotChats(id, callback) {
    this.collection.doc('chats').onSnapshot((doc) => {
      callback(doc.data()[id] || null)
    })
  }

  onSnapshotChatsCCTV(id, callback) {
    this.collection.doc('cctv').onSnapshot((doc) => {
      callback(doc.data()[id] || null)
    })
  }

  updateChatsCCTV(id, newData) {
    let obj = {}
    obj[id] = newData
    this.collection.doc('cctv').update(obj)
  }

  onSnapshotGowesHub(id, callback) {
    this.collection.doc('goweshub').onSnapshot((doc) => {
      callback(doc.data()[id] || null)
    })
  }

  onSnapshotChatsComment(id, callback) {
    this.collection.doc('comment').onSnapshot((doc) => {
      callback(doc.data()[id] || null)
    })
  }

  onSnapshotcommentEmergency(id, callback) {
    this.collection.doc('commentEmergency').onSnapshot((doc) => {
      callback(doc.data()[id] || null)
    })
  }

  updateChatsGowesHub(id, newData) {
    let obj = {}
    obj[id] = newData
    // console.log('MASUPP', obj)
    this.collection.doc('goweshub').update(obj)
  }

  updateChatsComment(id, newData) {
    let obj = {}
    obj[id] = newData
    this.collection.doc('comment').update(obj)
  }

  updatecommentEmergency(id, newData) {
    let obj = {}
    obj[id] = newData
    this.collection.doc('commentEmergency').update(obj)
  }
}

export default Firestore

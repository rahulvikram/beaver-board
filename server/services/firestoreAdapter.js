const { getFirestore } = require('firebase-admin/firestore');


class FirestoreAdapter {
  constructor(collectionName) {
    this.db = getFirestore();
    this.collection = this.db.collection(collectionName);
  }

  async add(id, data) {
    try {
      const docRef = await this.collection.doc(id).set(data);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  }

  async exists(id) {
    try {
      const doc = await this.collection.doc(id).get();
      return doc.exists;
    } catch (error) {
      return false;
    }
  }

  async getById(id) {
    try {
      const doc = await this.collection.doc(id).get();
      if (!doc.exists) {
        throw new Error('No such document!');
      }
      return doc.data();
    } catch (error) {
      console.error("Error getting document: ", error);
      throw error;
    }
  }

  async updateById(id, data) {
    try {
      await this.collection.doc(id).update(data);
      return true;
    } catch (error) {
      console.error("Error updating document: ", error);
      throw error;
    }
  }

  async removeById(id) {
    try {
      await this.collection.doc(id).delete();
      return true;
    } catch (error) {
      console.error("Error removing document: ", error);
      throw error;
    }
  }

  async search(field, operator, value) {
    try {
      const querySnapshot = await this.collection.where(field, operator, value).get();
      if (querySnapshot.empty) {
        return [];
      }
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error searching documents: ", error);
      throw error;
    }
  }
}

module.exports = {
    usersAdapter: new FirestoreAdapter('users')
};

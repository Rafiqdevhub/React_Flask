from flask import request, jsonify
from config import app, db
from models import Contact

@app.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Hello World"})

@app.route('/contacts', methods=['GET'])
def get_contact():
    contacts = Contact.query.all()
    json_contact = list(map(lambda contact: contact.to_json(), contacts))
    return jsonify({"contacts": json_contact})

@app.route('/create-contact', methods=['POST'])
def create_contact():
    name = request.json['name']
    email = request.json['email']
    phone = request.json['phone']
    message = request.json['message']
    
    if not name or not email or not phone or not message:
        return jsonify({"error": "Missing data"}), 400
    
    new_contact = Contact(name=name, email=email, phone=phone, message=message)
    try:
        db.session.add(new_contact)
        db.session.commit()
        return jsonify({"message": "Contact created"}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route('/update-contact/<int:id>', methods=['PUT'])
def update_contact(id):
    contact = Contact.query.get(id)
    if not contact:
        return jsonify({"error": "Contact not found"}), 404
    
    name = request.json['name']
    email = request.json['email']
    phone = request.json['phone']
    message = request.json['message']
    
    if not name or not email or not phone or not message:
        return jsonify({"error": "Missing data"}), 400
    
    contact.name = name
    contact.email = email
    contact.phone = phone
    contact.message = message
    
    db.session.commit()
    
    return jsonify({"message": "Contact updated"}), 200


@app.route('/delete-contact/<int:id>', methods=['DELETE'])
def delete_contact(id):
    contact = Contact.query.get(id)
    if not contact:
        return jsonify({"error": "Contact not found"}), 404
    db.session.delete(contact)
    db.session.commit()
    
    return jsonify({"message": "Contact deleted"}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

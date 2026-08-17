from flask import Blueprint, render_template, jsonify, request
from app import db

api_bp = Blueprint('api', __name__)

# Veritabanı Modeli (Görevler / Veriler)
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    category = db.Column(db.String(50), default='Genel')
    status = db.Column(db.String(20), default='Yapılacak') # Yapılacak, Yapılıyor, Tamamlandı

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'category': self.category,
            'status': self.status
        }

# Ana Sayfa Render
@api_bp.route('/')
def index():
    return render_template('index.html')

# API: Tüm Görevleri Getir
@api_bp.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks])

# API: Yeni Görev Ekle
@api_bp.route('/api/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    new_task = Task(title=data['title'], category=data.get('category', 'Genel'))
    db.session.add(new_task)
    db.session.commit()
    return jsonify(new_task.to_dict()), 201

# API: Görev Durumu Güncelle
@api_bp.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = Task.query.get_or_404(task_id)
    data = request.get_json()
    if 'status' in data:
        task.status = data['status']
    db.session.commit()
    return jsonify(task.to_dict())

# API: Görev Sil
@api_bp.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({'result': True})
'''
This is the database creation script.
'''

from sqlalchemy import Column, DateTime, Boolean, String, Integer, Float, ForeignKey, func
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class Quest(Base):
    __tablename__='Quest'
    id= Column(Integer, primary_key=True)
    name = Column(String(20), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    expiration_date = Column(DateTime, nullable=False)
    objective_id = Column(Integer, ForeignKey('Objective.id'), nullable=False)
    challenge_id = Column(Integer, ForeignKey('Challenge.id'), nullable=False)
    post_time = Column(DateTime, default=func.now())

class Objective(Base):
    __tablename__='Objective'
    id= Column(Integer, primary_key=True)
    objective_text = Column(String(200), nullable=False)

class Challenge(Base):
    __tablename__='Challenge'
    id= Column(Integer, primary_key=True)
    challenge_text = Column(String(200), nullable=False)

class QuestSubmission(Base):
    __tablename__='QuestSubmission'
    id= Column(Integer, primary_key=True)
    imgur_uri = Column(String(300), nullable=False)
    text_response = Column(String(300), nullable=False)
    quest_id =  Column(Integer, ForeignKey('Quest.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('User.id'), nullable=False)
    completion_time = Column(DateTime, default=func.now())

class User(Base):
    __tablename__='User'
    id= Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    user_name = Column(String(50), nullable=False)
    unique_identifier = Column(String(300), nullable=False, unique=True)
    join_time = Column(DateTime, default=func.now())

def insert_seed_data(Session):
    session = Session()
    challenges = [
        Challenge(challenge_text="Find the statue in Gore Park!"),
        Challenge(challenge_text="Capture a Pokemon at McMaster")
    ]

    objectives = [
        Objective(objective_text="Take a picture of it!"),
        Objective(objective_text="Do it with gusto!")
    ]

    quests = [
        Quest(name="State1", latitude=1.0,
            longitude=2.0,
            expiration_date=datetime.datetime(2017, 5, 5),
            challenge_id=1,
            objective_id=1),
        Quest(name="State2", latitude=4.0,
            longitude=3.0,
            expiration_date=datetime.datetime(2017, 5, 5),
            challenge_id=2,
            objective_id=2)
    ]

    for objective in objectives:
        session.add(objective)

    for challenge in challenges:
        session.add(challenge)
    session.commit()

    for quest in quests:
        session.add(quest)
    session.commit()

if __name__=="__main__":
    import ConfigParser
    config = ConfigParser.ConfigParser()
    config.read("config.ini")
    database_name = config.get("Database", "database_name")
    server_name = config.get("Database", "server_name")
    username = config.get("Database", "username")
    password = config.get("Database", "password")
    from sqlalchemy import create_engine
    engine = create_engine('mysql+pymysql://{0}:{1}@{2}'.format(username,
        password,
        server_name))
    engine.execute("CREATE DATABASE IF NOT EXISTS {0}".format(database_name))
    engine.execute("USE {0}".format(database_name))
    engine = create_engine('mysql+pymysql://{0}:{1}@{2}/{3}'.format(username,
        password,
        server_name,
        database_name))
    from sqlalchemy.orm import sessionmaker
    session = sessionmaker()
    session.configure(bind=engine)
    Base.metadata.create_all(engine)
    insert_seed_data(session)

'''
This is the database creation script.
'''

from sqlalchemy import Column, DateTime, String, Integer, Float, ForeignKey, func
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Quest(Base):
    __tablename__='Quest'
    id= Column(Integer, primary_key=True)
    name = Column(String(20))
    latitude = Column(Float)
    longitude = Column(Float)
    post_time = Column(DateTime, default=func.now())
    expiration_date = Column(DateTime)
    challenge_id = Column(Integer, ForeignKey(Challenge.id))

class ChallengeObjectives(Base):
    __tablename__='QuestObjectives'
    id= Column(Integer, primary_key=True)
    objective_text = Column(String(200))

class QuestChallengeObjectives(Base):
    __tablename__='QuestChallengeObjectives'
    id= Column(Integer, primary_key=True)
        quest_id = Column(Integer, ForeignKey(Quest.id))
        challenge_objective_id = Column(Integer,
            ForeignKey(ChallengeObjectives.id))

class Challenge(Base):
    __tablename__='Challenge'
    id= Column(Integer, primary_key=True)
    challenge_text = Column(String(200))

class QuestSubmission(Base):
    __tablename__='QuestSubmission'
    id= Column(Integer, primary_key=True)
    image_path = String(300)
    quest_id =  Column(Integer, ForeignKey(Quest.id))
    user_id = Column(String(200))

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

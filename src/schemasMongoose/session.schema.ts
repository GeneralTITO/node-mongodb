import mongoose from 'mongoose';

const { Schema, model } = mongoose;


const SessionSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
  });
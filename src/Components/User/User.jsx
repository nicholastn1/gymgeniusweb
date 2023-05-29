import React from 'react';
import UserHeader from './UserHeader';
import { Route, Routes } from 'react-router-dom';
import Workouts from './Workouts';
import Exercises from './Exercises';
import Statistics from './Statistics';

const User = () => {
  return (
    <section className="container">
      <UserHeader />
      <Routes>
        <Route path="/" element={<Workouts />} />
        <Route path="exercises" element={<Exercises />} />
        <Route path="statistics" element={<Statistics />} />
      </Routes>
    </section>
  );
};

export default User;

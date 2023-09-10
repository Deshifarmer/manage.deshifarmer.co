import { useState, useEffect } from "react";

function calculateAge(birthdate) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

function useFarmerAge(initialBirthdate) {
  const [birthdate, setBirthdate] = useState(initialBirthdate);
  const [age, setAge] = useState(calculateAge(initialBirthdate));

  useEffect(() => {
    setAge(calculateAge(birthdate));
  }, [birthdate]);

  return {
    birthdate,
    setBirthdate,
    age,
  };
}

export default useFarmerAge;

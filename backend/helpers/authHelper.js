import bcrypt from "bcrypt";

// hashed the password using bcrypt.hash
export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log("error");
  }
};

// compare the user password and hashedPassword using bcrypt.compare
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

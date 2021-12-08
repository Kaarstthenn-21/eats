import React from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import AppForm from "../components/forms/AppForm";
import Screen from "../components/Screen";
import colors from "../configs/colors";
import * as yup from "yup";
import AppFormFeilds from "../components/forms/AppFormFeilds";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import { auth } from "../configs/firebase";
import tailwind from 'tailwind-react-native-classnames';

const ValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, ({ min }) => `Nombre debe tener ${min} caracteres mínimo`)
    .max(50, ({ max }) => `Nombre no debe ser mayor a ${max} caracteres`)
    .required("Nombre es requerido"),
  email: yup
    .string()
    .email("Ingrese un Email válido")
    .required("Email obligatorio"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password debe ser mayor de ${min} carácteres`)
    .required("Password es requerido"),
});

function SignupScreen({ navigation }) {

  const signUpUser = ({ name, email, password }) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user
          .updateProfile({ displayName: name })
          .then(() => {
            // User account created & signed in!
          })
          .catch((err) => {
            Alert.alert("Error", err.message)
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("Error", "El email ingresado, ya existe :(!")
        }

        if (error.code === "auth/invalid-email") {
          Alert.alert("Error", "Email inválido!")
        }

        Alert.alert('ERROR: ', error.message);
      });
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.wrapper}>
        <View style={tailwind`py-4 rounded-2xl`}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </View>
        <Text style={styles.wellcomeTo}>
          Ingresa a SR <Text style={styles.brand}>EATS</Text>
        </Text>
        <View style={styles.form}>
          <AppForm
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={ValidationSchema}
            onSubmit={(values) => signUpUser(values)}
          >
            <AppFormFeilds
              name="name"
              placeholder="Kaarstthenn Alexander"
            />
            <AppFormFeilds
              name="email"
              placeholder="kaarstthen@gmail.com"
              keyboardType="email-address"
            />
            <AppFormFeilds
              name="password"
              placeholder="Password"
              autoCompleteType="off"
              password={true}
            />
            <AppSubmitButton title="Registrarse" />
          </AppForm>
        </View>

        <Text style={styles.join}>
          Ya cuentas con una cuenta?{" "}
          <Text
            onPress={() => navigation.navigate("UserLogin")}
            style={{ color: colors.primary }}
          >
            Login
          </Text>
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: 'center'
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  logo: {
    height: 160,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 30
  },
  wellcomeTo: {
    fontSize: 23,
    fontWeight: "700",
    color: colors.secondary,
    marginTop: 20,
    textAlign: "center",
  },
  brand: {
    fontSize: 23,
    color: colors.primary,
    textAlign: "center",
    fontWeight: "500",
  },
  form: {
    marginTop: 10,
  },
  join: {
    marginTop: 16,
    textAlign: "center",
    color: colors.black,
  },
  or: {
    color: colors.gray,
    textAlign: "center",
    marginVertical: 20,
  },
});

export default SignupScreen;

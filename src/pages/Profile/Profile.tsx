import { FiArrowLeft, FiEdit2 } from "react-icons/fi";
import { Text } from "../../components/Text/Text";
import style from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../Store/Store";
import {
  updateUser,
  openProfileEdit,
  closeProfileEdit,
  updateProfileInputs,
  openPasswordEdit,
  closePasswordEdit,
  updatePasswordInputs
} from "../../features/LoginSlice";

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(
    (state: RootState) => state.login.user
  );

  const profileInputs = useSelector(
    (state: RootState) => state.login.profileInputs
  );

  const passwordInputs = useSelector(
    (state: RootState) => state.login.passwordInputs
  );

  const profileEditOpen = useSelector(
    (state: RootState) => state.login.profileEditOpen
  );

  const passwordEditOpen = useSelector(
    (state: RootState) => state.login.passwordEditOpen
  );

  const handleUpdateProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!user?.id) {
      return;
    }

    const updatedUser = {
      ...user,
      name: profileInputs.name,
      surname: profileInputs.surname,
      email: profileInputs.email,
      phone: profileInputs.phone
    };

    try {
      const response = await fetch(
        `http://localhost:3000/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedUser)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();

      dispatch(updateUser(data));
      dispatch(closeProfileEdit());
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!user?.id) {
      return;
    }

    if (
      passwordInputs.currentPassword !==
      user.password
    ) {
      alert("Current password is incorrect.");
      return;
    }

    if (
      passwordInputs.newPassword !==
      passwordInputs.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    const updatedUser = {
      ...user,
      password: passwordInputs.newPassword,
      confirmPassword: passwordInputs.confirmPassword
    };

    try {
      const response = await fetch(
        `http://localhost:3000/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedUser)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update password");
      }

      const data = await response.json();

      dispatch(updateUser(data));
      dispatch(closePasswordEdit());

      alert("Password changed successfully.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={style.profilePage}>
      <button
        onClick={() => navigate("/home")}
        className={style.backButton}
      >
        <FiArrowLeft />
      </button>

      <div className={style.profileHeader}>
        <div className={style.icon}>
          <Text variant="h1">
            {user?.name?.charAt(0).toUpperCase()}
          </Text>
        </div>

        <div className={style.profileDetails}>
          <Text variant="h2">
            {user?.name} {user?.surname}
          </Text>

          <Text variant="p">
            {user?.email}
          </Text>

          <Text variant="p">
            {user?.phone}
          </Text>
        </div>
      </div>

      <div className={style.card}>
        <div className={style.cardHeader}>
          <Text variant="h2">
            Personal information
          </Text>

          <button
            className={style.editButton}
            onClick={() =>
              dispatch(openProfileEdit())
            }
          >
            <FiEdit2 />
          </button>
        </div>

        <div className={style.personalInfo}>
          <div>
            <Text variant="p">First Name</Text>
            <Text variant="p">{user?.name}</Text>
          </div>

          <div>
            <Text variant="p">Last Name</Text>
            <Text variant="p">{user?.surname}</Text>
          </div>

          <div>
            <Text variant="p">Email Address</Text>
            <Text variant="p">{user?.email}</Text>
          </div>

          <div>
            <Text variant="p">Phone number</Text>
            <Text variant="p">{user?.phone}</Text>
          </div>
        </div>
      </div>

      <div className={style.passwordCard}>
        <Text variant="h2">
          Change Password
        </Text>

        <button
          className={style.editButton}
          onClick={() =>
            dispatch(openPasswordEdit())
          }
        >
          <FiEdit2 />
        </button>
      </div>

      {profileEditOpen && (
        <div className={style.popup}>
          <div className={style.modal}>
            <Text variant="h2">
              Edit Personal Information
            </Text>

            <form onSubmit={handleUpdateProfile}>
              <input
                type="text"
                value={profileInputs.name}
                onChange={(e) =>
                  dispatch(
                    updateProfileInputs({
                      name: e.target.value
                    })
                  )
                }
                placeholder="First Name"
                required
              />

              <input
                type="text"
                value={profileInputs.surname}
                onChange={(e) =>
                  dispatch(
                    updateProfileInputs({
                      surname: e.target.value
                    })
                  )
                }
                placeholder="Last Name"
                required
              />

              <input
                type="email"
                value={profileInputs.email}
                onChange={(e) =>
                  dispatch(
                    updateProfileInputs({
                      email: e.target.value
                    })
                  )
                }
                placeholder="Email"
                required
              />

              <input
                type="text"
                value={profileInputs.phone}
                onChange={(e) =>
                  dispatch(
                    updateProfileInputs({
                      phone: e.target.value
                    })
                  )
                }
                placeholder="Phone number"
                required
              />

              <button type="submit">
                Save
              </button>

              <button
                type="button"
                onClick={() =>
                  dispatch(closeProfileEdit())
                }
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {passwordEditOpen && (
        <div className={style.popup}>
          <div className={style.modal}>
            <Text variant="h2">
              Change Password
            </Text>

            <form onSubmit={handleUpdatePassword}>
              <input
                type="password"
                value={
                  passwordInputs.currentPassword
                }
                onChange={(e) =>
                  dispatch(
                    updatePasswordInputs({
                      currentPassword:
                        e.target.value
                    })
                  )
                }
                placeholder="Current password"
                required
              />

              <input
                type="password"
                value={
                  passwordInputs.newPassword
                }
                onChange={(e) =>
                  dispatch(
                    updatePasswordInputs({
                      newPassword:
                        e.target.value
                    })
                  )
                }
                placeholder="New password"
                required
              />

              <input
                type="password"
                value={
                  passwordInputs.confirmPassword
                }
                onChange={(e) =>
                  dispatch(
                    updatePasswordInputs({
                      confirmPassword:
                        e.target.value
                    })
                  )
                }
                placeholder="Confirm new password"
                required
              />

              <button type="submit">
                Change Password
              </button>

              <button
                type="button"
                onClick={() =>
                  dispatch(closePasswordEdit())
                }
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
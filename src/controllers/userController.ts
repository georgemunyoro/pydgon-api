import { User } from "../models/user";

// Display list of all Users
export async function userList(req, res) {
  const users = await User.findAll();

  res.status(200).json({
    message: "User List",
    data: {
      users,
    },
  });
}

// Display detail page for a specific User.
export async function userDetail(req, res) {
  res.send("NOT IMPLEMENTED: User detail: " + req.params.id);
}

// Display User create form on GET.
export async function userCreateGet(req, res) {
  res.send("NOT IMPLEMENTED: User create GET");
}

// Handle User create on POST.
export async function userCreatePost(req, res) {
  res.send("NOT IMPLEMENTED: User create POST");
}

// Display User delete form on GET.
export async function userDeleteGet(req, res) {
  res.send("NOT IMPLEMENTED: User delete GET");
}

// Handle User delete on POST.
export async function userDeletePost(req, res) {
  res.send("NOT IMPLEMENTED: User delete POST");
}

// Display User update form on GET.
export async function userUpdateGet(req, res) {
  res.send("NOT IMPLEMENTED: User update GET");
}

// Handle User update on POST.
export async function userUpdatePost(req, res) {
  res.send("NOT IMPLEMENTED: User update POST");
}

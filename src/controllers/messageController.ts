import { Message } from "../models/message";

// Display list of all Message.
export async function messageList(req, res) {
  res.send("NOT IMPLEMENTED: Message list");
}

// Display detail page for a specific Message.
export async function messageDetail(req, res) {
  res.send("NOT IMPLEMENTED: Message detail: " + req.params.id);
}

// Display Message create form on GET.
export async function messageCreateGet(req, res) {
  res.send("NOT IMPLEMENTED: Message create GET");
}

// Handle Message create on POST.
export async function messageCreatePost(req, res) {
  res.send("NOT IMPLEMENTED: Message create POST");
}

// Display Message delete form on GET.
export async function messageDeleteGet(req, res) {
  res.send("NOT IMPLEMENTED: Message delete GET");
}

// Handle Message delete on POST.
export async function messageDeletePost(req, res) {
  res.send("NOT IMPLEMENTED: Message delete POST");
}

// Display Message update form on GET.
export async function messageUpdateGet(req, res) {
  res.send("NOT IMPLEMENTED: Message update GET");
}

// Handle Message update on POST.
export async function messageUpdatePost(req, res) {
  res.send("NOT IMPLEMENTED: Message update POST");
}

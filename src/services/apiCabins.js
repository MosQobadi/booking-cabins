import supabase, { supabaseUrl } from "./supabase.js";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("lahkljahsd", error);
    throw new Error("Cabins could not be loaded");
  }

  return cabins;
}

export async function addCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // https://kcoknoqshvlvmphpqvov.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    throw new Error("Couldn not be created!");
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image, {
      cacheControl: "3600",
      upsert: false,
    });

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin could not be created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error?.code === "23503") {
    throw new Error(
      "There is a reservation for this cabin, you cannot delete it!"
    );
  }

  if (error && error.code !== "23503") {
    throw new Error("Couldn not be deleted");
  }

  return data;
}

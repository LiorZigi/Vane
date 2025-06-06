import supabase from "../../initSupabase";

export async function uploadMediaFile(
  file: Blob,
  userId: string
): Promise<string> {
  const ext = file.type.split('/')[1];
  const filename = `${crypto.randomUUID()}.${ext}`;
  const path = `post-media/${userId}/${filename}`;

  const { error: uploadError } = await supabase
    .storage
    .from('post-media')
    .upload(path, file, { upsert: false });
  if (uploadError) throw uploadError;

  const { data } = supabase
    .storage
    .from('post-media')
    .getPublicUrl(path);

  return data.publicUrl;
}

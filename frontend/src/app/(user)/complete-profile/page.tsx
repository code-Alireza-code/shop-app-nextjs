import CompleteProfileForm from "./_/components/CompleteProfileForm";

function page() {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full md:max-w-sm">
        <CompleteProfileForm />
      </div>
    </div>
  );
}

export default page;

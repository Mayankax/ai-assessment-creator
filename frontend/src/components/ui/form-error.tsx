interface FormErrorProps {
  message?: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <p className="text-[12px] text-error mt-[4px]">
      {message}
    </p>
  );
}
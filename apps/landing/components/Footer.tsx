const footerData = "© 2023 AI Generated Inc. All rights reserved.";

export function Footer() {
  return (
    <footer className="mx-auto w-full px-4 bg-gray-50 dark:bg-black">
      <div className="border-t-4 py-6 border-black dark:border-pink-900">
        <p className="text-center text-xl text-gray-900 dark:text-white font-semibold">
          {footerData}
        </p>
      </div>
    </footer>
  );
}

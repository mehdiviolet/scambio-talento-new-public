import React from "react";

const ProfileAbout = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 bg-teal-100 px-3 py-2 rounded">
        About me:
      </h2>
      <p className="text-gray-600 leading-relaxed">
        {FormData.aboutMe ||
          "Mi chiamo Sara e sono un'artista appassionata di pittura a olio e musica. Creativa, curiosa e sempre in cerca di nuove ispirazioni. Amo l'arte in tutte le sue forme e credo nel potere delle esperienze condivise. Mi piace imparare, sperimentare e conoscere persone con le stesse passioni."}
      </p>
    </div>
  );
};

export default ProfileAbout;

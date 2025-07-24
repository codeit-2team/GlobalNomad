export default function ExperienceCard() {
  return (
    <div className="rounded-xl overflow-hidden shadow-md bg-white">
      <img
        src="/img/experience1.jpg"
        alt="체험 이미지"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">강릉 서핑 클래스</h3>
        <p className="text-sm text-gray-600">강원도 강릉시 · ₩35,000</p>
      </div>
    </div>
  );
}

const Rating = ({ rating }) => {
    return (
      <div className="ratings text-lg">
        <div className="relative inline-block text-gray-300">
          <div>☆☆☆☆☆</div>
          <div
            className="absolute top-0 left-0 text-[#FA8128] overflow-hidden whitespace-nowrap"
            style={{ width: `${(rating / 5) * 100}%` }}
          >
            ★★★★★
          </div>
        </div>
      </div>
    );
  };
  
  export default Rating;
  
function AreYouSure(thisThing) {
   
    return (
    <div>
      <h1>Are you sure you would like to delete {thisThing.name}?</h1>
      <button onClick={thisThing.handleYes}>
        Yes
      </button>
        <button onClick={thisThing.handleNo}>
          No
      </button>
    </div>
  );
}

export default AreYouSure;

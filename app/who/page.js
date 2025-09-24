import organisers from "../_data/organisers.json";

export const metadata = {
  title: "Who are we?",
  description:
    "This meetup has been running since 2017 and has been organised by a number of wonderful folks.",
};

export default function () {
  return (
    <>
      <p>
        This meetup has been running since 2017 and has been organised by a
        number of wonderful folks.
      </p>
      <p>Currently it's organised by:</p>

      <ul>
        {organisers.map((organiser) => (
          <li key={organiser.name}>
            {organiser.url ? (
              <a href="{{organiser.url}}">{organiser.name}</a>
            ) : (
              organiser.name
            )}

            {organiser.email && (
              <>
                &nbsp;(
                <a href={`mailto:${organiser.email}`}>{organiser.email}</a>)
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

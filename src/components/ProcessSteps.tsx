import { STEPS, type Step } from '../data/content';

export default function ProcessSteps({ steps }: { steps?: Step[] }) {
  const items = steps ?? STEPS;
  return (
    <ol className="steps">
      {items.map((s, i) => (
        <li key={s.title} className="step" data-num={i + 1}>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

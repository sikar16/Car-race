import React, { useEffect, useState } from 'react';
import { FaTrophy, FaUser } from 'react-icons/fa';

const rankIcons = ['🥇', '🥈', '🥉'];

const ScoreList = () => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const storedScores = JSON.parse(localStorage.getItem('scores') || '[]');
        // Sort scores descending
        storedScores.sort((a, b) => b.score - a.score);
        setScores(storedScores);
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Lobster, cursive',
        }}>
            <div style={{
                background: '#fff',
                borderRadius: 24,
                boxShadow: '0 8px 32px #6366f155',
                padding: '40px 32px',
                minWidth: 500,
                maxWidth: 680,
                width: '100%',
                margin: '32px 0',
            }}>
                <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24, color: '#222', textAlign: 'center', letterSpacing: 1 }}>
                    <FaTrophy style={{ color: '#facc15', marginRight: 12, fontSize: 32, verticalAlign: 'middle' }} />
                    Score List
                </h1>
                {scores.length > 0 ? (
                    <>
                        <div style={{
                            marginBottom: 24,
                            padding: '16px 0',
                            background: '#fef9c3',
                            borderRadius: 16,
                            textAlign: 'center',
                            fontWeight: 700,
                            fontSize: 22,
                            color: '#b45309',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 12,
                        }}>
                            <FaTrophy style={{ color: '#facc15', fontSize: 28 }} />
                            Highest Score: {scores[0].score} ({scores[0].email})
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 18 }}>
                                <thead>
                                    <tr style={{ background: '#f3f4f6', color: '#374151' }}>
                                        <th style={{ padding: '10px 0', fontWeight: 700 }}>Rank</th>
                                        <th style={{ padding: '10px 0', fontWeight: 700 }}>User</th>
                                        <th style={{ padding: '10px 0', fontWeight: 700 }}>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scores.map((s, i) => (
                                        <tr
                                            key={i}
                                            style={{
                                                background: i === 0 ? '#fef9c3' : i % 2 === 0 ? '#f9fafb' : '#fff',
                                                fontWeight: i === 0 ? 700 : 500,
                                                color: i === 0 ? '#b45309' : '#222',
                                                fontSize: i === 0 ? 20 : 18,
                                                borderBottom: '1px solid #f3f4f6',
                                            }}
                                        >
                                            <td style={{ textAlign: 'center', padding: '10px 0' }}>
                                                {rankIcons[i] || (i + 1)}
                                            </td>
                                            <td style={{ textAlign: 'center', padding: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                                <FaUser style={{ color: '#6366f1', fontSize: 18, marginRight: 4 }} />
                                                {s.email}
                                            </td>
                                            <td style={{ textAlign: 'center', padding: '10px 0' }}>{s.score}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <div style={{ fontSize: 20, color: '#6b7280', textAlign: 'center', marginTop: 32 }}>
                        No scores yet. Play the game to add your score!
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScoreList; 